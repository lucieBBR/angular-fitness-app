import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        FlexLayoutModule, 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule],
    exports: [
        FlexLayoutModule, 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule], 
})

export class MaterialModule { }