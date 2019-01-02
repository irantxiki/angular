import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';


@Component({
  selector: 'app-confirm-eliminar',
  templateUrl: './confirm-eliminar.component.html',
  encapsulation: ViewEncapsulation.Native
})
export class ConfirmEliminarComponent implements OnInit {
  @Input() mensaje = 'default label';

  constructor() { }
  idEliminar = '0';

  ngOnInit() {
  }

  onOkEliminar() {
  //   $('#modalConfirmEliminar').on('show.bs.modal', function(e) {

  //     // //get data-id attribute of the clicked element
  //     // var bookId = $(e.relatedTarget).data('book-id');

  //     // //populate the textbox
  //     // $(e.currentTarget).find('input[name="bookId"]').val(bookId);
  //     const num = 1;

  //     let ccc: number = num * 2;

  //     ccc = ccc + 123;

  //     // $('#rrNohay').val(ccc);
  // });
    alert('Ahora se tiene que eliminar.');
    // $(function() { alert('Hello'); });
  }
}
