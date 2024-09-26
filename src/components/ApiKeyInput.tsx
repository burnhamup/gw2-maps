import { useEffect, useState } from "react";
import { useApi } from "../context/apiContext";

export const ApiKeyInput = () => {
    const {setApiKey, apiKey} = useApi();
    const [inputKey, setInputKey] = useState(apiKey);

    useEffect(() => {
        setInputKey(apiKey);
    }, [apiKey]);
    
    const onClick = () => {
        setApiKey(inputKey);
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputKey(event.target.value);
    }
    return (
       <div id="apiKeyInput">
            <label>GW2 Api key:
                <input name="api_key" value={inputKey} onChange={onChange}/>
                <button onClick={onClick}>Save Key</button>
            </label>
       </div>
    )
};