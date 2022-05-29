import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const GuessEditor: React.FC = () => {
    const { runId } = useParams();
    const [ error, setError ] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!runId) {
            setError("Run not found.");
        } else {
            
        }
    }, [ runId, dispatch ]);
    
    return (
        <div>

        </div>
    )
}

export default GuessEditor;
