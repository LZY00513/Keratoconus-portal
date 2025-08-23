"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  Upload,
  FileText,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Home,
  X,
  Plus,
  AlertCircle,
  CloudUpload,
} from "lucide-react"
import Link from "next/link"

interface FormData {
  // Step 1: File Upload
  files: File[]
  uploadProgress: number

  // Step 2: Metadata
  title: string
  description: string
  dataType: string
  fileFormat: string
  device: string
  resolution: string
  sampleCount: string
  tags: string[]
  author: string
  institution: string
  email: string
  fundingSource: string
  ethicsApproval: string

  // Step 3: Compliance
  deidentified: boolean
  ethicsApproved: boolean
  dataRights: boolean
  licenseAgreement: boolean

  // Step 4: Review
  doi: string
  citation: string
}

const initialFormData: FormData = {
  files: [],
  uploadProgress: 0,
  title: "",
  description: "",
  dataType: "",
  fileFormat: "",
  device: "",
  resolution: "",
  sampleCount: "",
  tags: [],
  author: "",
  institution: "",
  email: "",
  fundingSource: "",
  ethicsApproval: "",
  deidentified: false,
  ethicsApproved: false,
  dataRights: false,
  licenseAgreement: false,
  doi: "",
  citation: "",
}

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newTag, setNewTag] = useState("")

  const steps = [
    { number: 1, title: "File Upload", icon: Upload },
    { number: 2, title: "Metadata", icon: FileText },
    { number: 3, title: "Compliance", icon: Shield },
    { number: 4, title: "Review & Submit", icon: CheckCircle },
  ]

  const progress = (currentStep / steps.length) * 100

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }))
      simulateUpload()
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }))
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setFormData((prev) => ({ ...prev, uploadProgress: progress }))
      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
      }
    }, 200)
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.files.length > 0 && !isUploading
      case 2:
        return (
          formData.title &&
          formData.description &&
          formData.dataType &&
          formData.fileFormat &&
          formData.author &&
          formData.institution &&
          formData.email
        )
      case 3:
        return formData.deidentified && formData.ethicsApproved && formData.dataRights && formData.licenseAgreement
      case 4:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceedToNext() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    alert("Dataset submitted successfully! It will be reviewed by our team.")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">KC Data Portal</h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <Link href="/browse" className="text-slate-600 hover:text-emerald-600 font-medium">
                Browse
              </Link>
              <span className="text-emerald-600 font-medium">Upload</span>
              <Link href="/docs" className="text-slate-600 hover:text-emerald-600 font-medium">
                Documentation
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-emerald-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Upload Dataset</h1>
          <p className="text-slate-600">Share your keratoconus research data with the scientific community</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              const isAccessible = currentStep >= step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : isActive
                          ? "border-emerald-600 text-emerald-600 bg-white"
                          : isAccessible
                            ? "border-slate-300 text-slate-400 bg-white"
                            : "border-slate-200 text-slate-300 bg-slate-50"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`text-sm font-medium ${
                        isActive ? "text-emerald-600" : isCompleted ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      Step {step.number}
                    </p>
                    <p
                      className={`text-sm ${
                        isActive ? "text-emerald-600" : isCompleted ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 h-0.5 bg-slate-200">
                      <div
                        className="h-full bg-emerald-600 transition-all duration-300"
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Upload your dataset files"}
              {currentStep === 2 && "Provide detailed information about your dataset"}
              {currentStep === 3 && "Confirm compliance and data sharing agreements"}
              {currentStep === 4 && "Review your submission before publishing"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: File Upload */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <CloudUpload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Drag and drop your files here, or click to browse
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Supported formats: PNG, TIFF, CSV, DICOM. Maximum file size: 100MB per file.
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                    accept=".png,.tiff,.csv,.dcm"
                  />
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </label>
                  </Button>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading files...</span>
                      <span>{formData.uploadProgress}%</span>
                    </div>
                    <Progress value={formData.uploadProgress} />
                  </div>
                )}

                {/* File List */}
                {formData.files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">Uploaded Files ({formData.files.length})</h4>
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">{file.name}</p>
                            <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Metadata */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Dataset Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a descriptive title for your dataset"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide a detailed description of your dataset, methodology, and key findings"
                      className="mt-1 min-h-24"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataType">Data Type *</Label>
                    <Select
                      value={formData.dataType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, dataType: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Topography">Topography</SelectItem>
                        <SelectItem value="Tomography">Tomography</SelectItem>
                        <SelectItem value="Clinical">Clinical</SelectItem>
                        <SelectItem value="Biomechanics">Biomechanics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fileFormat">File Format *</Label>
                    <Select
                      value={formData.fileFormat}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, fileFormat: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select file format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PNG">PNG</SelectItem>
                        <SelectItem value="TIFF">TIFF</SelectItem>
                        <SelectItem value="CSV">CSV</SelectItem>
                        <SelectItem value="DICOM">DICOM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="device">Device/Instrument</Label>
                    <Input
                      id="device"
                      value={formData.device}
                      onChange={(e) => setFormData((prev) => ({ ...prev, device: e.target.value }))}
                      placeholder="e.g., Pentacam HR, Cirrus HD-OCT"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sampleCount">Sample Count</Label>
                    <Input
                      id="sampleCount"
                      type="number"
                      value={formData.sampleCount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sampleCount: e.target.value }))}
                      placeholder="Number of samples/patients"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Tags</h4>
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="ml-2">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                      placeholder="Principal investigator name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => setFormData((prev) => ({ ...prev, institution: e.target.value }))}
                      placeholder="Research institution or hospital"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="researcher@institution.edu"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fundingSource">Funding Source</Label>
                    <Input
                      id="fundingSource"
                      value={formData.fundingSource}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fundingSource: e.target.value }))}
                      placeholder="e.g., NIH Grant EY123456"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="ethicsApproval">Ethics Approval Number</Label>
                    <Input
                      id="ethicsApproval"
                      value={formData.ethicsApproval}
                      onChange={(e) => setFormData((prev) => ({ ...prev, ethicsApproval: e.target.value }))}
                      placeholder="IRB approval number"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Compliance */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-amber-800">Important Compliance Requirements</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Please ensure all data meets ethical and legal requirements before submission.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="deidentified"
                      checked={formData.deidentified}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, deidentified: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="deidentified" className="font-medium">
                        Data De-identification *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        I confirm that all data has been properly de-identified and contains no personally identifiable
                        information (PII) or protected health information (PHI) as defined by HIPAA and other applicable
                        privacy regulations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="ethicsApproved"
                      checked={formData.ethicsApproved}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, ethicsApproved: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="ethicsApproved" className="font-medium">
                        Ethics Approval *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        This research has been approved by an appropriate institutional review board (IRB) or ethics
                        committee, and all participants provided informed consent for data sharing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataRights"
                      checked={formData.dataRights}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, dataRights: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="dataRights" className="font-medium">
                        Data Rights *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        I have the legal right to share this data and have obtained all necessary permissions from
                        co-investigators, institutions, and funding agencies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="licenseAgreement"
                      checked={formData.licenseAgreement}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, licenseAgreement: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="licenseAgreement" className="font-medium">
                        License Agreement *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        I agree to license this data under Creative Commons Attribution 4.0 International (CC BY 4.0),
                        allowing others to use, share, and adapt the data with proper attribution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">Data Usage Guidelines</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Data will be made publicly available for research purposes</li>
                    <li>• Users must cite your dataset in any publications or presentations</li>
                    <li>• Commercial use is permitted under CC BY 4.0 license</li>
                    <li>• You retain copyright and will be credited as the original author</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-emerald-800">Ready to Submit</h4>
                      <p className="text-sm text-emerald-700 mt-1">
                        Please review your submission details below. Once submitted, your dataset will be reviewed by
                        our team.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Dataset Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <strong>Title:</strong> {formData.title}
                      </div>
                      <div>
                        <strong>Type:</strong> {formData.dataType}
                      </div>
                      <div>
                        <strong>Format:</strong> {formData.fileFormat}
                      </div>
                      <div>
                        <strong>Files:</strong> {formData.files.length} files
                      </div>
                      <div>
                        <strong>Device:</strong> {formData.device || "Not specified"}
                      </div>
                      <div>
                        <strong>Samples:</strong> {formData.sampleCount || "Not specified"}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Author Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <strong>Author:</strong> {formData.author}
                      </div>
                      <div>
                        <strong>Institution:</strong> {formData.institution}
                      </div>
                      <div>
                        <strong>Email:</strong> {formData.email}
                      </div>
                      <div>
                        <strong>Funding:</strong> {formData.fundingSource || "Not specified"}
                      </div>
                      <div>
                        <strong>Ethics:</strong> {formData.ethicsApproval || "Not specified"}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700">{formData.description}</p>
                  </CardContent>
                </Card>

                {formData.tags.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Data is de-identified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Ethics approval obtained</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Data rights confirmed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">License agreement accepted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} disabled={!canProceedToNext()} className="bg-emerald-600 hover:bg-emerald-700">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
              Submit Dataset
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
