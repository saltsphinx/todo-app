import pp from "passport";
import LocalStrategy from "passport-local";
import knex from "./db.js";
import bcrypt from "bcryptjs";

const passport = new pp.Passport();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await knex
        .from("user")
        .where("username", username.toLowerCase())
        .first();

      if (!user) {
        return done(null, false, {
          message: "Username or password entered were incorrect.",
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, {
          message: "Username or password entered were incorrect.",
        });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await knex.from("user").where("id", id).first();

    if (!user) {
      done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
