import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';

const StatusModal = (props: any) => {
    return(
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className="status-modal">
                    <Icon icon="material-symbols:error-circle-rounded-outline" />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.modalTitle}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {props.modalDescription}
                    </Typography>
                    {props.children}
                </Box>
            </Modal>
        </>
    )
};
export default StatusModal;

