import styles from "./WeeklyMealCalendar.module.css"

function WeeklyMealCalendar() {

  const days = [

    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"

  ]

  return (

    <div className={styles.calendar}>

      <h2>
        Weekly Meal Calendar
      </h2>

      <div className={styles.grid}>

        {

          days.map((day,index)=>(

            <div
              key={index}
              className={styles.card}
            >

              <h3>{day}</h3>

              <p>
                Plan your meals 🍔
              </p>

            </div>

          ))

        }

      </div>

    </div>

  )

}

export default WeeklyMealCalendar