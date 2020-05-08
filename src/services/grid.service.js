import ApiService from "./../services/api.service";
import NotifyService from "./../services/notify.service";
//import AddEditUser from "./../pages/main/admin/dialogs/AddEditUser";

import {
  Dialog
} from 'quasar'

const GridService = {
  addEditRecord(dialogComponent, selected, props, parent) {
    return new Promise((resolve, reject) => {
      Dialog.create({
          component: dialogComponent,
          parent: parent,
          data: {
            selectedRow: selected,
            props: props
          }
        })
        .onOk(res => {
          console.log('res', res)
          debugger
          if (res.data.status == 1) {
            NotifyService.showSuccessMessage(res.data.message);
            resolve(true);
          } else {
            NotifyService.showErrorMessage(res.data.message);
            resolve(false);
          }
        })
        .onCancel(() => {
          console.log("Cancel");
          resolve(false);
        });
    });
  },
  deleteRecord(row, props) {
    return new Promise((resolve, reject) => {
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
                resolve(true);
              } else {
                NotifyService.showErrorMessage(res.data.message);
                resolve(false);
              }
            },
            err => {
              NotifyService.showErrorMessage(err.toString());
              resolve(false);
            }
          );
        })
        .onCancel(() => {
          resolve(false);
        });

    });
  },
};

export default GridService;
