class SButton extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const name = this.getAttribute("name");
    const title = this.getAttribute("title");
    let div = document.createElement("div");
    let span = document.createElement("div");
    span.setAttribute("class", "s-b-active");
    div.appendChild(span);
    div.setAttribute("class", "s-button");
    this.appendChild(div);
    div.addEventListener("click", function() {
      span.setAttribute(
        "class",
        span.getAttribute("class") == "s-b-inactive"
          ? "s-b-active"
          : "s-b-inactive"
      );
    });
  }
}

class SCalender extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const name = this.getAttribute("name");
    const title = this.getAttribute("title");
    let div = document.createElement("div");
    let input = document.createElement("input");
    div.appendChild(input);
    this.appendChild(div);
    input.addEventListener("focus", function(event) {
      if (document.querySelector(".s-calender")) {
        this.parentNode.removeChild(document.querySelector(".s-calender"));
      }
      let cal = document.createElement("div");
      cal.setAttribute("class", "s-calender");
      cal.innerHTML = `<div class="card">
            <div class="wid-inline">
            <button class="my-col-sm-6" id="previous" onclick="previous()">  &#8882;</button>
            <select class="my-col-sm-4" name="month" id="month" onchange="jump()">
                    <option value=0>Jan</option>
                    <option value=1>Feb</option>
                    <option value=2>Mar</option>
                    <option value=3>Apr</option>
                    <option value=4>May</option>
                    <option value=5>Jun</option>
                    <option value=6>Jul</option>
                    <option value=7>Aug</option>
                    <option value=8>Sep</option>
                    <option value=9>Oct</option>
                    <option value=10>Nov</option>
                    <option value=11>Dec</option>
                </select>
                <label for="year"></label>
                <select class="my-col-sm-4" name="year" id="year" onchange="jump()">
                <option value=1990>1990</option>
                <option value=1991>1991</option>
                <option value=1992>1992</option>
                <option value=1993>1993</option>
                <option value=1994>1994</option>
                <option value=1995>1995</option>
                <option value=1996>1996</option>
                <option value=1997>1997</option>
                <option value=1998>1998</option>
                <option value=1999>1999</option>
                <option value=2000>2000</option>
                <option value=2001>2001</option>
                <option value=2002>2002</option>
                <option value=2003>2003</option>
                <option value=2004>2004</option>
                <option value=2005>2005</option>
                <option value=2006>2006</option>
                <option value=2007>2007</option>
                <option value=2008>2008</option>
                <option value=2009>2009</option>
                <option value=2010>2010</option>
                <option value=2011>2011</option>
                <option value=2012>2012</option>
                <option value=2013>2013</option>
                <option value=2014>2014</option>
                <option value=2015>2015</option>
                <option value=2016>2016</option>
                <option value=2017>2017</option>
                <option value=2018>2018</option>
                <option value=2019>2019</option>
                <option value=2020>2020</option>
                <option value=2021>2021</option>
                <option value=2022>2022</option>
                <option value=2023>2023</option>
                <option value=2024>2024</option>
                <option value=2025>2025</option>
                <option value=2026>2026</option>
                <option value=2027>2027</option>
                <option value=2028>2028</option>
                <option value=2029>2029</option>
                <option value=2030>2030</option>
            </select>
            <button class="my-col-sm-6" id="next" onclick="next()">&#8883;</button>
        </div>
            <table class="table table-bordered table-responsive-sm" id="calendar">
                <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                </thead>
                <tbody id="calendar-body">
                </tbody>
            </table>
        </div>
    `;
      this.parentNode.appendChild(cal);
      cal.addEventListener("click", function(event) {
        event.stopPropagation();
      });
      new SCalender().showCalendar();
    });
    input.addEventListener("click", function(event) {
      event.stopPropagation();
    });
    document.addEventListener("click", function() {
      const cal = document.querySelector(".s-calender");
      if (cal) {
        cal.remove(cal.selectedIndex);
      }
    });
  }
  showCalendar() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");

    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let monthAndYear = document.getElementById("monthAndYear");
    let tbl = document.getElementById("calendar-body"); // body of the calendar
    tbl.innerHTML = "";

    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
          if (
            date === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
          ) {
            cell.classList.add("bg-info");
          } // color today's date
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }
      }

      tbl.appendChild(row);
    }
  }
}
customElements.define("s-button", SButton);
customElements.define("s-calender", SCalender);
