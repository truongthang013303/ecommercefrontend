import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import Form from '../pages/form';
import FormikDynamic from './FormikDynamic';

const DialogFormDynamic = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
        <DialogContent>
          {/* <Form
            initialValues={props.initStateFormikDialog}
            handleFormSubmit={props.handleFormSubmit}
          /> */}
          <FormikDynamic
            initialValues={props.initStateFormikDialog}
            handleFormSubmit={props.handleFormSubmit}
            columns={props.columns}
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