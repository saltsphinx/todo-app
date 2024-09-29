const todoWrapper = document.querySelector(".todo-wrapper")

interface Todo {
    id: number;
    title: string;
    longTitle: string;
    isComplete: boolean;
}



export default function generateTodo(todo: Todo, handleDelete: any): void {
    const wrapperElem = document.createElement("div");
    const checkBox = document.createElement("input");
    const titleElem = document.createElement("h3");
    const longTitleElem = document.createElement("p");
    const deleteBtn = document.createElement("button");

    checkBox.type = "checkbox";
    titleElem.textContent = todo.title;
    longTitleElem.textContent = todo.title;
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', handleDelete);
    
    wrapperElem.appendChild(checkBox);
    wrapperElem.appendChild(titleElem);
    wrapperElem.appendChild(longTitleElem);
    wrapperElem.appendChild(deleteBtn);

    todoWrapper?.appendChild(wrapperElem);
}