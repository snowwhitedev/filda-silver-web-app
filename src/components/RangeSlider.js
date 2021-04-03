import React, {useEffect, useState} from 'react'
import { Range, getTrackBackground } from 'react-range'

const RangeSlider = ({option, handleSliderChange, readonly = false, max = 100}) => {
  let [values, setValues] = useState([option.value || 0] )
  const MIN = 0

  useEffect(() => {
    setValues([option.value])
  }, [option])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      <div style={{color: 'white'}}>{option.title}</div>
      <Range
        key={option.title}
        values={values}
        step={1}
        min={MIN}
        max={max > 100 ? option.value + 1 : max}
        disabled={readonly}
        onChange={(values) => {
          setValues(values)
        }}
        onFinalChange={(values) => {
          handleSliderChange(option.title, values[0])
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '2rem',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              title={`${parseFloat(option.value / max).toFixed(4)}%`}
              style={{
                height: '0.5rem',
                width: '100%',
                borderRadius: '2px',
                background: getTrackBackground({
                  values: values,
                  colors: ['#548BF4', '#ccc'],
                  min: MIN,
                  max: max
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          readonly ?
          <></> :
          <div
            {...props}
            style={{
              ...props.style,
              height: '2rem',
              width: '2rem',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                height: '2rem',
                lineHeight: '2rem',
                textAlign: 'center'
              }}
            >
              {values[0]}
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default RangeSlider
