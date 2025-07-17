import { IoCarSportOutline } from "react-icons/io5";
import PrimarySearchAppBar from "../components/test";

export default function Admin() {
    return (
        <>
            <div className="row w-100">
                <div className="col-md-3  d-none d-lg-flex ">
                    <div className="bg-dark w-25 vh-100 position-fixed">
                        <div>
                            <h4 className="text-light mt-3 mx-4"> <IoCarSportOutline className="fs-1" />LOCATION</h4>
                            <hr className="text-light w-100" />
                        </div>

                    </div>
                </div>
                <div className="col-md-9">
                    <PrimarySearchAppBar />
                </div>
            </div>
        </>
    )
}