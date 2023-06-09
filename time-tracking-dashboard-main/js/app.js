const tableEl = document.querySelector('.table');
const timeListEl = document.querySelectorAll('.time li');

const todos = `[
    {
        "title": "Work",
        "timeframes": {
            "daily": {
                "current": 5,
                "previous": 7
            },
            "weekly": {
                "current": 32,
                "previous": 36
            },
            "monthly": {
                "current": 103,
                "previous": 128
            }
        }
    },
    {
        "title": "Play",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 2
            },
            "weekly": {
                "current": 10,
                "previous": 8
            },
            "monthly": {
                "current": 23,
                "previous": 29
            }
        }
    },
    {
        "title": "Study",
        "timeframes": {
            "daily": {
                "current": 0,
                "previous": 1
            },
            "weekly": {
                "current": 4,
                "previous": 7
            },
            "monthly": {
                "current": 13,
                "previous": 19
            }
        }
    },
    {
        "title": "Exercise",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 1
            },
            "weekly": {
                "current": 4,
                "previous": 5
            },
            "monthly": {
                "current": 11,
                "previous": 18
            }
        }
    },
    {
        "title": "Social",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 3
            },
            "weekly": {
                "current": 5,
                "previous": 10
            },
            "monthly": {
                "current": 21,
                "previous": 23
            }
        }
    },
    {
        "title": "Self Care",
        "timeframes": {
            "daily": {
                "current": 0,
                "previous": 1
            },
            "weekly": {
                "current": 2,
                "previous": 2
            },
            "monthly": {
                "current": 7,
                "previous": 11
            }
        }
    }
  ]`;

const parsedTodos = JSON.parse(todos);

const createTodoEl = (title, hrs, prvhrs) => {
    let todoClass = title.toLowerCase();

    if (title === 'Self Care') {
        todoClass = 'selfcare';
    }

    const todoEl = document.createElement('div');
    todoEl.classList.add(todoClass);
    todoEl.innerHTML = `
            <div class="todo">
                <span class="header">${title}</span>
                <img src="https://svgshare.com/i/dkG.svg" alt="todo menu" class="menu">
            </div>
            <div class="stats">
                <p class="hrs">${hrs}hrs</p>
                <p class="prv-hrs">Last Week - ${prvhrs}hrs</p>
            </div>
        `;
    return todoEl;
};

const onPageLoad = () => {
    parsedTodos.forEach(todo => {
        tableEl.appendChild(createTodoEl(todo.title, todo.timeframes.daily.current, todo.timeframes.daily.previous));
    });
};

timeListEl.forEach(li => {
    li.addEventListener('click', () => {
        [...tableEl.children].forEach((child, i) => {
            if (i > 1) {
                child.remove();
            }
        });

        parsedTodos.forEach(todo => {
            let currentHrs;
            let previousHrs;

            if (li.id === 'dly') {
                currentHrs = todo.timeframes.daily.current;
                previousHrs = todo.timeframes.daily.previous;
            } else if (li.id === 'wly') {
                currentHrs = todo.timeframes.weekly.current;
                previousHrs = todo.timeframes.weekly.previous;
            } else if (li.id === 'mly') {
                currentHrs = todo.timeframes.monthly.current;
                previousHrs = todo.timeframes.monthly.previous;
            }
            tableEl.appendChild(createTodoEl(todo.title, currentHrs, previousHrs));
        });
    });
});

onPageLoad();