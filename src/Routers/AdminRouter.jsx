import { Route, Routes, useNavigate } from 'react-router-dom';
import Admin from '../Admin/Admin';

const AdminRouter = () => {

    return (
        <div>
            <Routes>
                <Route path='/*' element={<Admin></Admin>}></Route>
            </Routes>
        </div>
    );
};

export default AdminRouter;