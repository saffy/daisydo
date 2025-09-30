import { useState } from 'react'

function ColorPicker({ label, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleColorChange = (e) => {
    onChange(e.target.value)
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    if (newValue.match(/^#[0-9a-fA-F]{0,6}$/)) {
      onChange(newValue)
    }
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium capitalize">
          {label.replace('-', ' ')}
        </span>
      </label>
      <div className="flex gap-2 items-center">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            className="w-12 h-12 rounded-lg border border-base-300 cursor-pointer"
            style={{ backgroundColor: value }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="input input-bordered input-sm flex-1 font-mono text-sm"
          placeholder="#000000"
        />
      </div>
      <div className="mt-2">
        <div 
          className="w-full h-8 rounded border border-base-300"
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  )
}

export default ColorPicker