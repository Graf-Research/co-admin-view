import { useRouter } from "next/router";

interface ErrorQueryExtractorProps {}

export function ErrorQueryExtractor(props: ErrorQueryExtractorProps) {
  const error = useRouter().query.error as string ?? '';

  return (
    <>
      { error && <div className={`text-red-500 text-[14px] text-center`}>
        { error }
      </div> }
    </>
  );
}
