import { motion as Motion }
from "framer-motion"

import styles
from "./Food3DCard.module.css"

function Food3DCard() {

  return (

    <div className={styles.wrapper}>

      <Motion.div

        className={styles.card}

        whileHover={{

          rotateY:12,

          rotateX:8,

          scale:1.05

        }}

        transition={{
          duration:0.3
        }}

      >

        <img

          src="
          https://images.unsplash.com/photo-1565299624946-b28f40a0ae38
          "

          alt="pizza"

        />

        <h2>
          Italian Pizza 🍕
        </h2>

        <p>
          Premium Cheese Pizza
        </p>

        <button>
          Order Now
        </button>

      </Motion.div>

    </div>

  )

}

export default Food3DCard