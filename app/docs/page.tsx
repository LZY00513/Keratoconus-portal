"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  FileText,
  Code,
  Upload,
  Eye,
  Shield,
  BookOpen,
  ExternalLink,
  Copy,
  Home,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const navigationSections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { id: "overview", title: "Platform Overview" },
      { id: "quick-start", title: "Quick Start Guide" },
      { id: "account-setup", title: "Account Setup" },
    ],
  },
  {
    title: "Upload Guidelines",
    icon: Upload,
    items: [
      { id: "data-requirements", title: "Data Requirements" },
      { id: "file-formats", title: "Supported File Formats" },
      { id: "metadata-standards", title: "Metadata Standards" },
      { id: "quality-control", title: "Quality Control" },
    ],
  },
  {
    title: "Visualization Controls",
    icon: Eye,
    items: [
      { id: "image-viewer", title: "Image Viewer" },
      { id: "zoom-controls", title: "Zoom & Pan Controls" },
      { id: "colormap-options", title: "Colormap Options" },
      { id: "measurement-tools", title: "Measurement Tools" },
    ],
  },
  {
    title: "API Documentation",
    icon: Code,
    items: [
      { id: "api-overview", title: "API Overview" },
      { id: "authentication", title: "Authentication" },
      { id: "endpoints", title: "API Endpoints" },
      { id: "code-examples", title: "Code Examples" },
    ],
  },
  {
    title: "Data Management",
    icon: Database,
    items: [
      { id: "data-organization", title: "Data Organization" },
      { id: "version-control", title: "Version Control" },
      { id: "sharing-permissions", title: "Sharing Permissions" },
      { id: "data-retention", title: "Data Retention" },
    ],
  },
  {
    title: "Compliance & Ethics",
    icon: Shield,
    items: [
      { id: "privacy-policy", title: "Privacy Policy" },
      { id: "data-protection", title: "Data Protection" },
      { id: "ethics-guidelines", title: "Ethics Guidelines" },
      { id: "licensing", title: "Licensing" },
    ],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Platform Overview</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                The Keratoconus Data Sharing Portal is a comprehensive platform designed to facilitate the sharing and
                analysis of keratoconus research data among the global scientific community.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Database className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Comprehensive Data Repository</h4>
                      <p className="text-sm text-slate-600">
                        Access thousands of keratoconus datasets including topography, tomography, and clinical data.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Advanced Visualization</h4>
                      <p className="text-sm text-slate-600">
                        Interactive image viewer with zoom, pan, and colormap controls for detailed analysis.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Code className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-medium">RESTful API</h4>
                      <p className="text-sm text-slate-600">
                        Programmatic access to all datasets through our comprehensive REST API.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-medium">HIPAA Compliant</h4>
                      <p className="text-sm text-slate-600">
                        All data is de-identified and stored according to strict privacy and security standards.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supported Data Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-emerald-100 text-emerald-700 mb-2">Topography</Badge>
                    <p className="text-sm text-slate-600">
                      Corneal elevation maps, curvature data, and surface analysis from devices like Pentacam, TMS, and
                      Placido disc systems.
                    </p>
                  </div>
                  <div>
                    <Badge className="bg-blue-100 text-blue-700 mb-2">Tomography</Badge>
                    <p className="text-sm text-slate-600">
                      Cross-sectional imaging data from OCT, Scheimpflug cameras, and other volumetric imaging systems.
                    </p>
                  </div>
                  <div>
                    <Badge className="bg-purple-100 text-purple-700 mb-2">Clinical</Badge>
                    <p className="text-sm text-slate-600">
                      Patient demographics, visual acuity measurements, refraction data, and treatment outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "quick-start":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Quick Start Guide</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Get started with the KC Data Portal in just a few simple steps.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      1
                    </span>
                    Browse Existing Datasets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Start by exploring our comprehensive collection of keratoconus research data.
                  </p>
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/browse">
                      <Database className="w-4 h-4 mr-2" />
                      Browse Datasets
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      2
                    </span>
                    Create an Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Register for a free account to upload your own datasets and access advanced features.
                  </p>
                  <Button variant="outline" className="bg-transparent">
                    Sign Up (Coming Soon)
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      3
                    </span>
                    Upload Your Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Share your research data with the community using our guided upload wizard.
                  </p>
                  <Button asChild variant="outline" className="bg-transparent">
                    <Link href="/upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Dataset
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "data-requirements":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Data Requirements</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Ensure your datasets meet our quality and compliance standards before uploading.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>File Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">File Size Limits</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Maximum file size: 100MB per file</li>
                    <li>• Maximum dataset size: 1GB total</li>
                    <li>• Compressed archives are recommended for large datasets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Image Requirements</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Minimum resolution: 512x512 pixels</li>
                    <li>• Recommended resolution: 1024x1024 pixels or higher</li>
                    <li>• Color depth: 8-bit or 16-bit per channel</li>
                    <li>• Calibrated measurements preferred</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Quality Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Image Quality</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Images must be free from artifacts and noise</li>
                    <li>• Proper focus and alignment required</li>
                    <li>• Consistent lighting and exposure</li>
                    <li>• No patient identifying information visible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Clinical Data</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Complete demographic information (age, gender)</li>
                    <li>• Standardized measurement units</li>
                    <li>• Consistent data collection protocols</li>
                    <li>• Quality control checks performed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "api-overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">API Overview</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Access KC Data Portal programmatically through our RESTful API.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Base URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm flex items-center justify-between">
                  <code>https://api.kcdata.org/v1</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("https://api.kcdata.org/v1")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  All API requests require authentication using an API key. Include your API key in the Authorization
                  header:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Free Tier:</strong>
                    <ul className="text-slate-600 mt-1">
                      <li>• 1,000 requests per hour</li>
                      <li>• 10,000 requests per day</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Research Tier:</strong>
                    <ul className="text-slate-600 mt-1">
                      <li>• 10,000 requests per hour</li>
                      <li>• 100,000 requests per day</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "code-examples":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Code Examples</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Sample code snippets to help you integrate with the KC Data Portal API.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>List Datasets</CardTitle>
                <CardDescription>Retrieve a list of available datasets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Python</h4>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`import requests

url = "https://api.kcdata.org/v1/datasets"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
datasets = response.json()

for dataset in datasets['data']:
    print(f"ID: {dataset['id']}, Title: {dataset['title']}")`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">JavaScript</h4>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`const response = await fetch('https://api.kcdata.org/v1/datasets', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
data.datasets.forEach(dataset => {
  console.log(\`ID: \${dataset.id}, Title: \${dataset.title}\`);
});`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">cURL</h4>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`curl -X GET "https://api.kcdata.org/v1/datasets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Download Dataset</CardTitle>
                <CardDescription>Download a specific dataset by ID</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Python</h4>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`import requests

dataset_id = "12345"
url = f"https://api.kcdata.org/v1/datasets/{dataset_id}/download"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers, stream=True)

with open(f"dataset_{dataset_id}.zip", "wb") as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "privacy-policy":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Privacy Policy</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our commitment to protecting your privacy and research data.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  We collect only the minimum necessary information to provide our services:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Account information (name, email, institution)</li>
                  <li>• Research datasets you choose to upload</li>
                  <li>• Usage analytics to improve our platform</li>
                  <li>• Technical logs for security and performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">We implement industry-standard security measures:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• End-to-end encryption for data transmission</li>
                  <li>• Encrypted storage with regular security audits</li>
                  <li>• Access controls and authentication</li>
                  <li>• Regular backups and disaster recovery</li>
                  <li>• HIPAA-compliant data handling procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Research datasets are shared according to the licenses specified by their authors. We never share
                  personal information without explicit consent.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> All uploaded datasets must be properly de-identified before submission.
                    We are not responsible for any personally identifiable information included in uploaded datasets.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Documentation</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Select a topic from the navigation menu to view detailed documentation.
              </p>
            </div>
          </div>
        )
    }
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
              <Link href="/upload" className="text-slate-600 hover:text-emerald-600 font-medium">
                Upload
              </Link>
              <span className="text-emerald-600 font-medium">Documentation</span>
              <Link href="/admin" className="text-slate-600 hover:text-emerald-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {navigationSections.map((section) => {
                      const Icon = section.icon
                      return (
                        <div key={section.title}>
                          <div className="px-4 py-2 bg-slate-50 border-b">
                            <h3 className="font-medium text-slate-900 text-sm flex items-center">
                              <Icon className="w-4 h-4 mr-2 text-slate-500" />
                              {section.title}
                            </h3>
                          </div>
                          {section.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setActiveSection(item.id)}
                              className={`w-full text-left px-6 py-2 text-sm hover:bg-slate-50 flex items-center justify-between ${
                                activeSection === item.id
                                  ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600"
                                  : "text-slate-600"
                              }`}
                            >
                              {item.title}
                              {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/browse">
                      <Database className="w-4 h-4 mr-2" />
                      Browse Datasets
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Data
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <a href="mailto:support@kcdata.org">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Contact Support
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-slate-200 p-8">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
