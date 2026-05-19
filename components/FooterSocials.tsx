import React from 'react'
import Link from 'next/link'
import InstagramIcon from '@/public/assets/icons/InstagramIcon.svg'
import GithubIcon from '@/public/assets/icons/Github.svg'
import LinkedInIcon from '@/public/assets/icons/LinkedIn.svg'
import Image from 'next/image'


export default function FooterSocials() {
    return (
        <div className='flex h-[30vmin] flex-row my-auto w-full justify-center pt-15 space-x-15 bg-gray-800'>
            <Link href={"https://github.com/IsaacTheEddy"} target='_blank' className='' >
                <Image src={GithubIcon} className='' alt="Github Icon" width={50} height={50} />
            </Link>
            <Link href={"https://www.linkedin.com/in/isaactheedwards/"} target='_blank'>
                <Image src={LinkedInIcon}  alt="LinkedIn Icon" width={50} height={50}/>
            </Link>
            <Link href={"https://www.instagram.com/issytheeddy"} target='_blank'>
                <Image src={InstagramIcon} alt="Instagram Icon" width={50} height={50}/>
            </Link>
        </div>
    )
}