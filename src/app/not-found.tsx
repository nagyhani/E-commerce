import Image from "next/image";





export default function GlobalNotFound() {
  return (
    <div className=" w-4/6 mx-auto flex justify-center">

      <Image src = {'\error.svg'} alt = "logo" width= {700} height={700}/>
    </div>
  )

}