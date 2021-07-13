import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export function GenericValidator(dateCompareControlName: string){

    let thisDateControl: AbstractControl;
    let otherDateControl: AbstractControl;

    return function isValidDate(control: AbstractControl): ValidationErrors {
        if (!control.parent) {
            return null;
        }
        if (!thisDateControl) {
            thisDateControl = control;
            otherDateControl = control.parent.get(dateCompareControlName) as AbstractControl;
            if (!otherDateControl) {
                throw new Error('isValidDate(): other control is not found in parent group');
            }
            otherDateControl.valueChanges.subscribe(() => {
                thisDateControl.updateValueAndValidity();
            });
        }
        if (!otherDateControl || !otherDateControl.value) {
            return null;
        }
        const date1 = thisDateControl.value;
        const date2 = otherDateControl.value;
        if (date1 !== null && date2 !== null && date1 < date2 ) {
            return {
                dateNotValid: true
            };
        }
        return null;
    };
}
