function Row(props) {
    const {children,addClass} = props;

  return (
    <div className={`row ${addClass ? addClass : ""}`}>
      {children}
    </div>
  )
}

export default Row
