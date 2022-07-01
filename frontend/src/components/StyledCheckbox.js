import { StyledCheckboxStyle } from "../style/StyledCheckbox";
import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";

// Checkbox used to check ingredients
export default function StyledCheckbox(props) {
  const classes = StyledCheckboxStyle();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  );
}
