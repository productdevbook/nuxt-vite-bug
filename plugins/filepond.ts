import Vue from 'vue'
import vueFilepond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
// Import the plugin code
// Import the plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Import the plugin code
// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'

const FilePond = vueFilepond(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
)
Vue.component('FilePond', FilePond)
