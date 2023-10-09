import React, { useMemo } from 'react';

const RecursiveContainer = ({config, formik}) => {
  const builder = (individualConfig) => {
    switch (individualConfig.type) {
      case 'text':
        return (
                <>
                <div>
                  <label htmlFor={individualConfig.field}>{individualConfig.label}</label>
                  <input type='text' 
                    name={individualConfig.field} 
                    onChange={formik.handleChange} style={{...individualConfig.style}} />
                  </div>
                </>
              );
      case 'number':
        return (
          <>
            <div>
              <label htmlFor={individualConfig.field}>{individualConfig.label}</label>
                  <input type='number' 
                    name={individualConfig.field} 
                    onChange={formik.handleChange} style={{...individualConfig.style}} />
            </div>
          </>
        )
      case 'array':
        return (
          <RecursiveContainer config={individualConfig.children || []} formik={formik} />
        );
      default:
        return <div>Unsupported field</div>
    }
  }

  return (
    <>
      {config.map((c) => {
        return builder(c);
      })}
    </>
  );
};

export default RecursiveContainer;