
export function InformativeCheckbox({ text, checked }: { text: string, checked: boolean }) {
    return <div className="flex items-center space-x-2 justify-between">
        <input type="checkbox" className="form-checkbox" disabled={true} checked={checked} />
        <label className="text-gray-700">{text}</label>
    </div>
}