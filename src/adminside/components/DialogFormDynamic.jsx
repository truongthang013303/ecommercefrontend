import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import FormikDynamic from './FormikDynamic';

const DialogFormDynamic = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
        <DialogContent>
          <FormikDynamic
            initialValues={props.initStateFormikDialog}
            handleFormSubmit={props.handleFormSubmit}
            columns={props.columns}
            isEdit={props.isEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={props.onClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    );
};

export default DialogFormDynamic;