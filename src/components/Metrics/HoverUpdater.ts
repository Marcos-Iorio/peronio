import { useEffect } from "react";

const HoverUpdater = ({
  locale,
  payload,
  setHoverValue,
  setHoverDate
}: any) => {
  useEffect(() => {
    setHoverValue(payload.price);
    setHoverDate(
      payload.date.toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  }, [locale, payload.price, payload.date, setHoverValue, setHoverDate]);

  return null;
};

export default HoverUpdater;
