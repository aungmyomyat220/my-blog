import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Image from 'next/image'

const Modal = ({user}) => {
  const [image, setImage] = useState(user.image);
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={'border border-black'}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>
            Profile Picture
          </Label>
          <div className="grid grid-cols-4 items-center gap-4">
            <div>
              <input
                accept="image/jpeg, image/png"
                type="file"
                id="fileInput"
                onChange={convertToBase64}
                style={{ display: 'none' }}
              />
                  <Image
                    src={image}
                    alt="Selected"
                    width="300"
                    className="w-16 h-16 ml-10 mb-3 rounded-full"
                    height={0}
                    onClick={handleImageClick}
                  />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder={'Enter your name'} value="Aung Myo Myat"
                   className="col-span-3 border border-black"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input type="email" id="email" disabled={true} placeholder={'Enter your email'}
                   value="aungmyomyat874@gmail.com" className="col-span-3 border border-black"/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <Input type='text' id="company" placeholder={'Enter your company'}
                   value="GIC Myanmar" className="col-span-3 border border-black"/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Language
            </Label>
            <Select>
              <SelectTrigger className="w-[277px] border border-black">
                <SelectValue placeholder="Select Language"/>
              </SelectTrigger>
              <SelectContent className={'cursor-pointer'}>
                <SelectGroup>
                  <SelectLabel>Frontend</SelectLabel>
                  <SelectItem value="react" className={'cursor-pointer'}>React</SelectItem>
                  <SelectItem value="next" className={'cursor-pointer'}>NextJS</SelectItem>
                  <SelectItem value="angular" className={'cursor-pointer'}>Angular</SelectItem>
                  <SelectItem value="vue" className={'cursor-pointer'}>VueJS</SelectItem>

                  <SelectLabel>Backend</SelectLabel>
                  <SelectItem value="java" className={'cursor-pointer'}>Java</SelectItem>
                  <SelectItem value="c++" className={'cursor-pointer'}>C++</SelectItem>
                  <SelectItem value="c#" className={'cursor-pointer'}>C#</SelectItem>
                  <SelectItem value="ruby" className={'cursor-pointer'}>Ruby</SelectItem>
                  <SelectItem value="go" className={'cursor-pointer'}>Go</SelectItem>
                  <SelectItem value="python" className={'cursor-pointer'}>Python</SelectItem>
                  <SelectItem value="node" className={'cursor-pointer'}>NodeJS</SelectItem>
                  <SelectItem value="php" className={'cursor-pointer'}>PHP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Experience
            </Label>
            <Select>
              <SelectTrigger className="w-[277px] border border-black">
                <SelectValue placeholder="Select your experience"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Experience</SelectLabel>
                  <SelectItem value="one" className={'cursor-pointer'}>1 year</SelectItem>
                  <SelectItem value="two" className={'cursor-pointer'}>2 years</SelectItem>
                  <SelectItem value="three" className={'cursor-pointer'}>3 years</SelectItem>
                  <SelectItem value="five" className={'cursor-pointer'}>5 years</SelectItem>
                  <SelectItem value="ten" className={'cursor-pointer'}>10 years</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal