export const settingsList = {
    post_producer: {
      title: 'Post Producer',
      description: [
        { Specification: 'First Preview Deadline', Importance: 'Mandatory' },
        { Specification: 'Campaign Name', Importance: 'Mandatory' },
        { Specification: 'Client', Importance: 'Mandatory' },
        { Specification: 'Brand', Importance: 'Mandatory' },
        { Specification: 'Country Code', Importance: 'Mandatory' },
        { Specification: 'Deliverable Type (olv/TVC/etc)', Importance: 'Mandatory' },
        { Specification: 'Delivery Method (peach/to client)', Importance: 'Mandatory' },
        { Specification: 'Job Number', Importance: 'Mandatory' },
        { Specification: 'Final Number of Exports', Importance: 'Important' },
        { Specification: 'Safe Zones', Importance: 'If applicable' },
        { Specification: 'Specs', Importance: 'If applicable' }
      ]
    },

    digital_designer: {
      title: 'Digital designer',
      description: [
        { Specification: 'Lucid link (done internally)', Importance: 'Mandatory' },
        { Specification: 'Specs (size, format and weight limit)', Importance: 'Mandatory' },
        { Specification: 'Safe Zones', Importance: 'Mandatory' },
        { Specification: 'Fonts', Importance: 'Mandatory if aplicable' },
        { Specification: 'HEX code for colours (RGB)', Importance: 'Mandatory if aplicable' },
        { Specification: 'References link / Open files link / Products or other elements link', Importance: 'If applicable' },
        { Specification: 'Clear instructions about what to do / to modify in the visual', Importance: 'Mandatory' },
        { Specification: 'Brand Guidelines / Campaign rules', Importance: 'Mandatory if aplicable' },
        { Specification: 'Deadline', Importance: 'Important' },
        { Specification: 'File naming', Importance: 'If applicable' }
      ]
    },

    html_developer: {
      title: 'Html Developer',
      description: [
        { Specification: 'Lucid link (done internally)', Importance: 'Mandatory' },
        { Specification: 'Specs (size, format, weight limit, max duration or loops)', Importance: 'Mandatory' },
        { Specification: 'Deadline', Importance: 'Important' },
        { Specification: 'PSD file link', Importance: 'Mandatory' },
        { Specification: 'Platform / server (DCM or GDN)', Importance: 'Mandatory' },
        { Specification: 'References link', Importance: 'If applicable' },
        { Specification: 'ClickTag implementation info', Importance: 'If applicable' }
      ]
    },

    qc_delivery_manager: {
      title: 'QC & Delivery Manager',
      description: [
        { Specification: 'Lucid link', Importance: 'Mandatory' },
        { Specification: 'Deliverable Type (olv/TVC/etc)', Importance: 'Mandatory' },
        { Specification: 'Delivery Method (peach/to client)', Importance: 'Mandatory' },
        { Specification: 'Specs', Importance: 'Mandatory' },
        { Specification: 'Images/videos attached for visual referece ', Importance: 'Important' },
        { Specification: 'Campaign Name', Importance: 'Mandatory' },
        { Specification: 'Naming convention ', Importance: 'If applicable' },
        { Specification: 'Safe Zones', Importance: 'If applicable' },
        { Specification: 'Name/location of the reference file', Importance: 'Mandatory' }
      ]
    },

    dtp_manager: {
      title: 'DTP manager',
      description: [
        { Specification: 'Campaign Name', Importance: 'Mandatory' },
        { Specification: 'Client', Importance: 'Mandatory' },
        { Specification: 'Brand', Importance: 'Mandatory' },
        { Specification: 'Country Code', Importance: 'Mandatory' },
        { Specification: 'Deadline date', Importance: 'Mandatory' },
        { Specification: 'Preview date', Importance: 'Mandatory' },
        { Specification: 'Number of assets', Importance: 'Important' },
        { Specification: 'RGB/CMYK - print or digital output', Importance: 'Mandatory' },
        { Specification: 'Technical info (dimensions, TI, bleed, cutouts...)', Importance: 'Mandatory' },
        { Specification: 'links to source files', Importance: 'Mandatory' }
      ]
    },

    pm: {
      title: 'PM',
      description: [
        { Specification: 'links to source files', Importance: 'Mandatory' },
        { Specification: 'Final Number of Exports', Importance: 'Mandatory' },
        { Specification: 'Reference filenames', Importance: 'Mandatory' },
        { Specification: 'Specs (size, format and weight limit)', Importance: 'Mandatory' },
        { Specification: 'Images/videos attached for visual referece ', Importance: 'If applicable' },
        { Specification: 'Info at the top left of each slide indicating which deliverable is being referenced', Importance: 'Important' },
        { Specification: 'info on each final deliverable ( specs, safezones, delivery option)', Importance: 'Mandatory' },
        { Specification: 'market & language since not always national language is used', Importance: 'Mandatory' },
        { Specification: 'delivery deadline for each asset if different', Importance: 'Mandatory' },
        { Specification: 'visual explanation of changes required', Importance: 'If applicable' },
        { Specification: 'campain name and creative name', Importance: 'Mandatory' }
      ]
    },

    postprod_operator: {
      title: 'Postproduction Operator',
      description: [
        { Specification: 'Client', Importance: 'Mandatory' },
        { Specification: 'Brand', Importance: 'Mandatory' },
        { Specification: 'Country Code', Importance: 'Mandatory' },
        { Specification: 'Deliverable Type (olv/TVC/etc)', Importance: 'Mandatory' },
        { Specification: 'Final Number of Exports', Importance: 'Mandatory' },
        { Specification: 'Specs (size, format and weight limit)', Importance: 'Mandatory' },
        { Specification: 'Safezones', Importance: 'Mandatory' },
        { Specification: 'Assets changes (Visual differences from the previous version)', Importance: 'Mandatory' },
        { Specification: 'Reference link(+reference video of that asset)', Importance: 'Mandatory if aplicable' }
      ]
    }
  };