import provincialTaxes from './provincial-taxes';
import tripExemptions from './trip-exemptions';
import popoverText from './popover-text';
import dutyCategories from './duty-categories';

export default function estimatorFactory() {
  return {
    getDutyCategories() {
      return dutyCategories;
    },
    getPopoverText() {
      return popoverText;
    },
    getProvincialTaxes() {
      return provincialTaxes;
    },
    getTripExemptions() {
      return tripExemptions;
    }
  };
}
