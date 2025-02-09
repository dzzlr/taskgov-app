import Image from "next/image"

export default function MemberCard({ image, name, position }) {
  return (
    <div className="p-4 flex flex-row gap-4 border border-slate-300 rounded-lg text-black cursor-pointer hover:bg-slate-100 transition duration-300 ease-in-out">
      <div className="w-1/5">
        <Image className="rounded-full" width={80} height={80} src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"} alt={"profile picture"} />
      </div>
      <div className="flex flex-col w-4/5 text-left justify-center">
        <div className="font-semibold">{name}</div>
        <div className="text-sm">{position}</div>
      </div>
    </div>
  )
}