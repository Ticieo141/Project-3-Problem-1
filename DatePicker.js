function DatePicker(id, callback) {
    this.id = id;
    this.callback = callback;
    this.currentDate = new Date();
}

DatePicker.prototype.render = function(date) {
    const week_days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const tbl = document.createElement('table');
    tbl.className = 'datepicker-table';

    const headerRow = tbl.insertRow();
    for (let day of week_days) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(day));
        headerRow.appendChild(th);
    }

    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let currentDay = 1;
    let isCurrentMonth = false;

    for (let i = 0; i < 6; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 7; j++) {
            const td = tr.insertCell();
            if (i === 0 && j < firstDayOfMonth.getDay()) {
                // Display days from the previous month
                const prevMonthDay = daysInMonth - firstDayOfMonth.getDay() + j + 1;
                td.appendChild(document.createTextNode(prevMonthDay));
                td.classList.add('prev-month-day');
            } else if (currentDay > daysInMonth) {
                // Display days from the next month
                const nextMonthDay = currentDay - (daysInMonth);
                td.appendChild(document.createTextNode(nextMonthDay));
                td.classList.add('next-month-day');
                currentDay++;
            } else {
                // Display days from the current month
                td.appendChild(document.createTextNode(currentDay));
                td.addEventListener('click', this.handleDayClick.bind(this, currentDay, month, year));
                isCurrentMonth = true;
                currentDay++;
            }

            if (isCurrentMonth) {
                td.classList.add('current-month-day');
                isCurrentMonth = false;
            }

            td.classList.add('datepicker-cell');
            
        }
        if(currentDay >= daysInMonth){
            break;
        }
    }

    const elem = document.getElementById(this.id);
    elem.innerHTML = '';
    elem.appendChild(tbl);

    // Add navigation controls
    const navDiv = document.createElement('div');
    navDiv.className = 'datepicker-navigation';

    const prevBtn = document.createElement('button');
    prevBtn.appendChild(document.createTextNode('<'));
    prevBtn.addEventListener('click', this.render.bind(this, new Date(year, month - 1, 1)));
    navDiv.appendChild(prevBtn);

    const monthYearDiv = document.createElement('div');
    monthYearDiv.appendChild(document.createTextNode(month_names[month] + ' ' + year));
    navDiv.appendChild(monthYearDiv);

    const nextBtn = document.createElement('button');
    nextBtn.appendChild(document.createTextNode('>'));
    nextBtn.addEventListener('click', this.render.bind(this, new Date(year, month + 1, 1)));
    navDiv.appendChild(nextBtn);

    elem.insertBefore(navDiv, tbl);
}

DatePicker.prototype.handleDayClick = function(day, month, year) {
    this.callback(this.id, { month: month + 1, day, year });
}