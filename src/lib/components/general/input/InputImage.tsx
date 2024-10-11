// import { uploadFile } from "@/utility";
import { InputHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
// import { uploadFile } from "@/utility";
import { Loading } from "../Loading";
// import { AuthContext } from "@/context/AuthContext";

export function InputImage(props: InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef(null);
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  function uploadImage() {
    // uploadFile(file, setLoading, authorization).then((value: string | undefined) => {
    //   props.onChange && props.onChange({
    //     target: {
    //       value
    //     }
    //   } as any);
    // }).catch(console.log);
  }

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  return (
    <div className={`border border-px border-gray-400 relative max-w-[300px] overflow-hidden flex flex-row items-center rounded-[12px] flex-start`}>
      <div 
        onClick={() => !loading && (ref.current as any).click()}
        className={`${props.value ? '' : 'w-[300px] h-[200px]'} max-w-[300px] max-h-[200px] rounded-[12px] relative flex items-center justify-center cursor-pointer`}>
        <img 
          src={props.value ? props.value as string : undefined}
          className={`w-[300px] h-[200px] rounded-[12px] object-contain`} />
        { loading && <div className={`z-10 absolute`}><Loading /></div> }
      </div>
      <input 
        ref={ref}
        onChange={e => {
          const files = e.target.files;
          if (!files) {
            console.log('no files');
            return;
          }
          setFile(files[0]);
          e.target.value = '';
        }}
        className={`bg-transparent outline-none font-inter text-sm p-3 px-5 text-white min-h-[80px]`}
        placeholder={'Placeholder'}
        type={'file'}
        hidden />
    </div>
  );
}
