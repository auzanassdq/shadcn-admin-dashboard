import { DropdownProps } from "react-day-picker";

export default function CalendarSelectCustom(props: DropdownProps) {
  return (
    // <Select
    //   name={props.name}
    //   aria-label={props["aria-label"]}
    //   onValueChange={() => {
    //     switch (props.name) {
    //       case "months":
    //         setMonth(props.value);
    //         break;
    //       case "years":
    //         setYear(props.value);
    //         break;
    //     }

    //     console.log(props.value);
    //     goToMonth(new Date(year, month));
    //   }}
    // >
    //   <SelectTrigger id={props.name}>
    //     <SelectValue placeholder={props.caption} />
    //   </SelectTrigger>
    //   <SelectContent>
    //     {props.children.map((item: any) => (
    //       <SelectItem key={item.key} value={item.props.children}>
    //         {item.props.children}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </Select>

    <select
      name={props.name}
      id={props.name}
      placeholder={props.caption}
      onChange={props.onChange}
      className="bg-zinc-700 px-2 py-2"
    >
      {props.children.map((item: any) => (
        <option key={item.key} value={item.props.value}>
          {item.props.children}
        </option>
      ))}
    </select>
  );
}
