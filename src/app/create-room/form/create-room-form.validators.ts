import { AbstractControl } from '@angular/forms/src/model';
import { Observable } from 'rxjs/internal/Observable';


//All validations are passed through
//Returns obj with status on error
//Implemented in each FormControl in the 2nd argument
export function ValidateRoomName(control: AbstractControl){

    const roomName = control.value;
    //Calls Backend DB to check to see if room name already

    if(roomName == "admin"){
        return {isValid: false, message: "Room Name is unavailable"};
    }

    if(!roomName){
        return {isValid: false, message: "Room Name is Required"}
    }

    return null;
}

export function ValidateRoomPassword(control: AbstractControl){
    const password = control.get('password');
    const confirmpw = control.get('confirmPassword');

    if(password && confirmpw && (password.value == confirmpw.value)){
        return {isValid: true};
    }

    return null;

}