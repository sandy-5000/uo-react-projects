import "./css/WarningAlert.css"

export default function WarningAlert({ message }) {
    return (
        <div className="absolute pop-alert h-[800px] w-full a-center z-10">
            <div className="bg-slate-100 shadow-2xl rounded-md a-center w-[350px] h-[200px]">
                <p className="text-xl font-sans font-semibold text-red-500 text-center">{message}</p>
            </div>
        </div>
    )
}
