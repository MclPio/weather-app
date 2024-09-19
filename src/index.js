import "./css/style.css";
import "material-symbols/outlined.css";
import {
  submitLocation,
  celsiusButton,
  fahrenheitButton,
} from "./ui/eventHandlers";
import { initLocalStorage } from "./utils/localStorage";
import { highlightTempSelection } from "./ui/domManipulation";
submitLocation();
initLocalStorage();
highlightTempSelection();
celsiusButton();
fahrenheitButton();
