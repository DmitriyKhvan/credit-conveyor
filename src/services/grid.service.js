import ApiService from "./../services/api.service";
import NotifyService from "./../services/notify.service";
import AddEditUser from "./../pages/main/admin/dialogs/AddEditUser";

import {
  Dialog
} from 'quasar'

const GridService = {
  addEditRecord(dialogComponent, selected, props) {
    Dialog.create({
        component: AddEditUser,
        parent: this,
        data: {
          selectedRow: selected,
          props: props
        }
      })
      .onOk(res => {
        if (res.data.status == 1) {
          NotifyService.showSuccessMessage(res.data.message);
        } else {
          NotifyService.showErrorMessage(res.data.message);
        }
      })
      .onCancel(() => {
        console.log("Cancel");
      });
  },
  deleteRecord(row, props) {
    Dialog.create({
        title: "Confirm",
        message: "Do you really want to delete?",
        cancel: true,
        persistent: true
      })
      .onOk(() => {
        ApiService.delete(props.delete + "?id=" + row.id).then(
          res => {
            if (res.data.status == 1) {
              NotifyService.showSuccessMessage(res.data.message);
            } else {
              NotifyService.showErrorMessage(res.data.message);
            }
          },
          err => {
            //console.log(err);
            NotifyService.showErrorMessage(err.toString());
          }
        );
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      });
  },
};

export default GridService;
