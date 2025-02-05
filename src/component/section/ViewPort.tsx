import { useStore } from "../../globalStores/viewer";

function ViewPort(){
    const {x,y,z} =  useStore(state=> state.vector)
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transform: `perspective(500px) rotateX(${z * 10}deg) rotateY(${y * 10}deg)`,
                border: '1px solid lightgray',
                background: 'rgba(255, 255, 255, 0.5)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '2px',
                    height: '100px',
                    backgroundColor: 'blue',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotateZ(${x * 10}deg)`,
                }}
            />
        </div>
    );
}

export default ViewPort
