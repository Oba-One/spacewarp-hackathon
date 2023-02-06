import { FC, useEffect, useState } from "react";
import { useStore } from '../Store';

export const ErrorToast:FC = () => {
    const {error, updateError} = useStore();
    const [timeoutEnabled, setTimeoutEnabled] = useState(false);

    if(error && !timeoutEnabled)
        setTimeout(()=>{
            updateError('');
            setTimeoutEnabled(false)
        }, 7000);

    return error ? <div className="toast toast-top toast-center w-60" style={{top: 70}}>
        <div className="alert alert-error justify-center">
          <div>
            <span>{error}</span>
          </div>
        </div>
      </div> : <></>
}
