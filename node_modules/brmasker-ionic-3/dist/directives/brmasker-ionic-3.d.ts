import { OnInit, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class BrModel {
    mask: string;
    len: number;
    person: boolean;
    phone: boolean;
    money: boolean;
}
export declare class BrMaskerIonic3 implements OnInit, ControlValueAccessor {
    private _renderer;
    private _elementRef;
    brmasker: BrModel;
    inputKeyup(event: any): void;
    inputOnblur(event: any): void;
    inputFocus(event: any): void;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    ngOnInit(): void;
    writeValue(fn: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    returnValue(value: string): any;
    private phoneMask(v);
    private peapollMask(v);
    private moneyMask(v);
    private onInput(value);
    private formataCampo(campo, Mascara, tamanho);
}
