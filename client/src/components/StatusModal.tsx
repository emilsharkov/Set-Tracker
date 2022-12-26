import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
const TrakaLogo = require('./../utils/logo-png.png')

const StatusModal = (props: any) => {
    return(
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className={!props.icon ? "status-modal-traka": "status-modal-icon"}>
                    <div className="status-modal-centering">
                        {!props.icon ? <img className="get-started-logo" src={TrakaLogo}/>: 
                            <Icon className="error-icon" icon={"radix-icons:cross-circled"}/>}
                    </div>
                    <div className="status-modal-centering">
                        <Typography className={!props.icon ? "status-modal-title-traka": "status-modal-title-icon"} variant="h6" component="h2">
                            {props.modalTitle}
                        </Typography>
                    </div>
                    <div className="status-modal-centering">
                        <Typography className={!props.icon ? "status-modal-description-traka": "status-modal-description-icon"}>
                            {props.modalDescription}
                        </Typography>
                    </div>
                    <div className="status-modal-centering">
                        {props.children}
                    </div>
                </Box>
            </Modal>
        </>
    )
};
export default StatusModal;

