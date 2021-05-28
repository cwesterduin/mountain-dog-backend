import React from "react"
import PropTypes from "prop-types"

const View = ({ title, children }) => (
  <section>
    <h1>{title}</h1>
    {children}
  </section>
)

View.propTypes = {
  title: PropTypes.string.isRequired,
}

export default View
