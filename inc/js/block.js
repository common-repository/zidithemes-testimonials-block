( function( editor, components, i18n, element ) {
	var el 					= element.createElement;
	var registerBlockType 	= wp.blocks.registerBlockType;
	var BlockControls 		= wp.editor.BlockControls;
	var AlignmentToolbar 	= wp.editor.AlignmentToolbar;
	var MediaUpload 		= wp.editor.MediaUpload;
	var TextControl 		= wp.components.TextControl;
	var TextareaControl 	= wp.components.TextareaControl;
	var InspectorControls 	= wp.editor.InspectorControls;
	var ColorPalette 		= wp.components.ColorPalette;
	var RangeControl		= wp.components.RangeControl;

	registerBlockType( 'zidithemes/img-block', {  
		title: i18n.__( 'Zidithemes Testimonials' ),
		description: i18n.__( 'Testimonials Gutenberg Block' ), 
		icon: 'camera', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { 
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			textINPUT: {
				type: 'string',
			},
			testimonialwidth: {
				type: 'range',
				default: 70,
			},
			colorButton: {
				type: 'string',
			},
			colorCardButton: {
				type: 'string',
			},
			colorText: {
				type: 'string',
			},
			textareainput: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes 			= props.attributes;
			var textINPUT 			= props.attributes.textINPUT;
			var textareaINPUT 		= props.attributes.textareainput;
			var colorButton 		= props.attributes.colorButton;
			var colorCardButton 	= props.attributes.colorCardButton;
			var colorText 			= props.attributes.colorText;
			var testimonialwidth	= props.attributes.testimonialwidth;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}


			return [

				//BEGIN INSPECTOR CONTROLS
				// Display the block options in the inspector panel.
				el( InspectorControls, { key: 'inspector' }, 

					
					//BEGIN INSPECTOR ZIDITHEMES TESTIMONIALS
					el( components.PanelBody, 
						{
							title: i18n.__('Zidithemes Testimonials Settings'),
							className: 'block-testimonials-width',
							initialOpen: false,
						},

						el( RangeControl, {
							beforeIcon: 'arrow-left-alt2',
							afterIcon: 'arrow-right-alt2',
							label: i18n.__( 'Testimonials Width' ),
							initialPosition: 40,
							value: testimonialwidth,
							onChange: function( newtestimonialwidth ) {
								props.setAttributes( { testimonialwidth: newtestimonialwidth } );
							},
							min: 0,
							max: 100,
						} ),
					),
					//BEGIN INSPECTOR COLOR CONTROLS
					el( components.PanelBody, {
							title: i18n.__( 'Zidithemes Testimonials Color' ),
							className: 'block-color-links',
							initialOpen: false,
						},
						el( 'p', {}, i18n.__( 'Testimonials Background Color' ) ),
						el( ColorPalette, {
							label: i18n.__( 'Color Palette' ),
							colors: [  
								        { name: 'white', color: '#fff' }, 
								        { name: 'dark', color: '#353439' }, 
	                        		 ],
							value: colorButton,
							onChange: function( newcolorButton ) {
								props.setAttributes( { colorButton: newcolorButton } );
							},
						} ),
						el( 'p', {}, i18n.__( 'Testimonials Card Background Color' ) ),
						el( ColorPalette, {
							label: i18n.__( 'Color Palette' ),
							colors: [  
								        { name: 'white', color: '#fff' }, 
								        { name: 'dark', color: '#353439' }, 
	                        		 ],
							value: colorCardButton,
							onChange: function( newcolorCardButton ) {
								props.setAttributes( { colorCardButton: newcolorCardButton } );
							},
						} ),
						el( 'p', {}, i18n.__( 'Testimonials Text Color' ) ),
						el( ColorPalette, {
							label: i18n.__( 'Color Palette' ),
							colors: [  
								        { name: 'white', color: '#fff' }, 
								        { name: 'dark', color: '#353439' }, 
	                        		 ],
							value: colorText,
							onChange: function( newcolorText ) {
								props.setAttributes( { colorText: newcolorText } );
							},
						} ),
					),
					//END INSPECTORS COLOR CONTROLS

				),

				//BEGIN BLOCK CONTROLS
				el( BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
					el( 'div', { className: 'components-toolbar' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							render: function( obj ) {
								return el( components.Button, {
									className: 'components-icon-button components-toolbar__control',
									onClick: obj.open
									},
									el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
										el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
									)
								);
							}
						} )
					),
					
				),
				//END BLOCK CONTROLS

				//BEGIN EDITOR STYLING
				el( 'div', { 
						className: props.className,
						style: { backgroundColor : colorButton }
				 },
					el( 'div', { className: 'zidithemes-mg' },
					el( 'div', {
						className: attributes.mediaID ? 'zidithemes-testimonials-image image-active' : 'zidithemes-testimonials-image image-inactive',
						style: { backgroundColor : colorCardButton, width: testimonialwidth + '%'}
					},
						el( MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
									className: attributes.mediaID ? 'image-button auth-img' : 'button button-large',
									onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} ),
						el( 'div', {
						className: 'zidithemes-testimonials-details' },

							el( 'div', {
								className: 'zidithemes-testimonials-details-inner' },

								
								el( TextareaControl, {
									type: 'url',
									style: { color: colorText },
									label: i18n.__( 'Enter Paragraph Here' ),
									value: textareaINPUT,
									onChange: function( newTextareaInput ) {
										props.setAttributes( { textareaINPUT: newTextareaInput } );
									},
								} ),
								el( TextControl, {
									type: 'string',
									style: { color: colorText },
									label: i18n.__( 'Enter Name' ),
									value: textINPUT,
									onChange: function( newTextInput ) {
										props.setAttributes( { textINPUT: newTextInput } );
									},
								} ),

							)
							
						)
					),
					)
				)
				//END EDITOR STYLING
			];

		},

		save: function( props ) {
			var attributes 			= props.attributes;
			var colorButton 		= props.attributes.colorButton;
			var colorCardButton 	= props.attributes.colorCardButton;
			var colorText 			= props.attributes.colorText;
			var testimonialwidth	= props.attributes.testimonialwidth;

			//BEGIN FRONT END STYLING
			return (
				el( 'div', {
					className: props.className,
					style: { backgroundColor : colorButton }
				},
				el( 'div', { className: 'zidithemes-front-mg' },
					el( 'div', {
							className: 'zidithemes-testimonials-image mb-wid-100',
							style: { backgroundColor : colorCardButton, width: testimonialwidth + '%'}
						},
						el( 'img', {
							src: attributes.mediaURL
						} ),
						el( 'div', {
								className: 'zidithemes-testimonials-details'
							}, 
							el( 'div', {
								className: 'zidithemes-testimonials-details-inner'
							}, 
								
										el( 'div', {
											className: 'desc',
											style: { color: colorText },
										},
										i18n.__( attributes.textareaINPUT , 'zidithemes-testimonials' )
										),
										el( 'div', {
											className: 'name',
											style: { color: colorText },
										},
											i18n.__( attributes.textINPUT , 'zidithemes-testimonials' )
										),
								
							),
						),
					),
					)
				)
				
			);
			//END FRONT END STYLING
		},
		} );

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);