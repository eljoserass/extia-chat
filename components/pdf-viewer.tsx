'use client'
export interface PdfViewerProps {
  file: File
}
export function PdfViewer({ file }: PdfViewerProps) {
  return (
    <object
      data={URL.createObjectURL(file)}
      type="application/pdf"
      className="h-[300] w-56 2xl:h-[440px] 2xl:w-auto rounded-lg mr-6 2xl:mr-14 border-2 border-double"
    >
      <embed
        src={URL.createObjectURL(file)}
        type="application/pdf"
        className="size-full"
      />
    </object>
  )
}
