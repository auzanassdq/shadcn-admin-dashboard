import { setMonth, setYear, startOfMonth } from "date-fns";
import { DropdownProps, useNavigation } from "react-day-picker";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface OptionProps {
  key: string;
  value: string;
  children: React.ReactNode;
}

// interface CalendarSelectCustomProps extends DropdownProps {
//   children?: React.ReactElement<OptionProps>[] | null;
// }

interface CalendarSelectCustomProps extends DropdownProps {
  children?: React.ReactNode | React.ReactNode[] | null;
}

export default function CalendarSelectCustom(props: CalendarSelectCustomProps) {
  const childrenArray = React.Children.toArray(props.children);
  let { goToMonth, currentMonth } = useNavigation();

  const onChange = (e: any) => {
    if (props.name == "months") {
      let selectedMonth = Number(e);
      let newMonth = setMonth(startOfMonth(currentMonth), selectedMonth);
      goToMonth(newMonth);
    }

    if (props.name == "years") {
      let newMonth = setYear(startOfMonth(currentMonth), Number(e));
      goToMonth(newMonth);
    }
  };

  return (
    <>
      <Select onValueChange={(e) => onChange(e)}>
        <SelectTrigger id={props.name} name={props.name}>
          <SelectValue placeholder={props.caption} />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[250px] rounded-md border p-4">
            {childrenArray.map((item: any) => (
              <SelectItem key={item.key} value={item.props.value}>
                {item.props.children}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </>
  );
}
