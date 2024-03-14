import React, {useCallback} from "react";
import { set, useForm } from "react-hook-form";
import {Button, Input, Select, RTE} from "../index"
import { appwriteConfService } from "../../appwrite/appwritePostService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {register, handleSubmit, watch, 
      setValue, control, getValues} = useForm({
        defaultValues: {
          title: post?.title || '',
          slug: post?.slug || '',
          content: post?.content || '',
          status: post?.status || 'active',
        }
      })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)
    const submit = async (data) => {
      if(post) {
        const imageFile = data.image[0] ? appwriteConfService.uploadImage(data.image[0]) : null;        
        if(imageFile) {
          appwriteConfService.deleteFile(post.featuredImage)
        }

        const dbpost = await appwriteConfService.updatePost(post.$id, {
          ...data,
          featuredImage: imageFile ? imageFile.$id : undefined
        })

        if(dbpost) {
          navigate(`post/${dbpost.$id}`)
        }

      } else {
        const imageFile = await appwriteConfService.uploadImage(data.image[0])

        if(imageFile) {
          const fileId = imageFile.$id;
          data.featuredImage = fileId;
          const newdbpost = await appwriteConfService.createPost({
            ...data,
            userId: userData.$id,
          })

          if(newdbpost) {
            navigate(`post/${newdbpost.$id}`)
          }

        }


      }
    }
    
    const slugTransform = useCallback((value) => {
      if(value && typeof value === 'string') {
        return value.trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
      }

      return '';

    })

    React.useEffect(() => {
      const subscription = watch((value, {name}) => {
        if(name == 'title') {
          setValue('slug', slugTransform(value.title, {shouldValidate: true}))
        }
      })

      // used for optimization, better memory management
      return () => { 
        subscription.unsubscribe() 
      }

    }, [watch, setValue, slugTransform])
    
    
    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteConfService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
