import "./css/style.css";
import "material-symbols/outlined.css";
import {
  submitLocation,
  celsiusButton,
  fahrenheitButton,
  recallLocation,
} from "./ui/eventHandlers";
import { initLocalStorage } from "./utils/localStorage";
import { highlightTempSelection } from "./ui/domManipulation";
submitLocation();
initLocalStorage();
highlightTempSelection();
celsiusButton();
fahrenheitButton();
recallLocation();
