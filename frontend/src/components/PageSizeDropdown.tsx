interface PropsType {
  pageSize: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}
function PageSizeDropdown(props: PropsType) {
  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}
    >
      <p>Rows per page</p>
      <select
        // disabled={props.disabled}
        value={props.pageSize}
        onChange={(event) => props.onChange(+event.target.value)}
      >
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSizeDropdown;
