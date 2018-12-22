import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  txtTitle: any;
  txtContent: any;

  constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.txtTitle = this.data.title;
    this.txtContent = this.data.content;

  }

  ngOnInit() {
  }


  onCloseConfirm() {
    this.dialogRef.close({ data: true });
  }
  onCloseCancel() {
    this.dialogRef.close();
  }

}
