import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const GuessEditor: React.FC = () => {
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const { runId } = useParams();
        if (!runId) {
            setError("Run not found.");
        } else {
            
        }
    }, [ dispatch ]);
    
    return (
        <div>

        </div>
    )
}

export default GuessEditor;
